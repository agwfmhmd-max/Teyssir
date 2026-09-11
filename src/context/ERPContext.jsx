import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const KEYS = { products:'products', customers:'customers', suppliers:'suppliers', invoices:'invoices', expenses:'expenses', revenues:'revenues', banks:'banks', salaries:'salaries' };
const seed = {
  products:[{id:'p1',name:'كيس أرز بسمتي 25 كغ',sku:'PRD-001',category:'مواد غذائية',buyPrice:780,sellPrice:950,stock:42,minStock:10},{id:'p2',name:'زيت نباتي 5 لتر',sku:'PRD-002',category:'مواد غذائية',buyPrice:310,sellPrice:390,stock:8,minStock:12},{id:'p3',name:'سكر أبيض 10 كغ',sku:'PRD-003',category:'مواد غذائية',buyPrice:260,sellPrice:330,stock:27,minStock:8},{id:'p4',name:'منظف أرضيات',sku:'PRD-004',category:'منظفات',buyPrice:120,sellPrice:175,stock:65,minStock:10}],
  customers:[{id:'c1',name:'شركة الأمل للتجارة',phone:'22241122',email:'contact@alamal.mr',balance:4500},{id:'c2',name:'أحمد ولد محمد',phone:'22253344',email:'',balance:0},{id:'c3',name:'متجر النور',phone:'22267788',email:'',balance:1250}],
  suppliers:[{id:'s1',name:'مؤسسة موريتانيا للتوزيع',phone:'22219876',balance:6200},{id:'s2',name:'موردو الساحل',phone:'22234567',balance:0}],
  invoices:[{id:'inv1',number:'INV-2026-001',customer:'شركة الأمل للتجارة',date:'2026-09-08',total:18400,paid:12000,status:'partial',items:3},{id:'inv2',number:'INV-2026-002',customer:'متجر النور',date:'2026-09-09',total:7250,paid:7250,status:'paid',items:2},{id:'inv3',number:'INV-2026-003',customer:'أحمد ولد محمد',date:'2026-09-10',total:3920,paid:0,status:'unpaid',items:4}],
  expenses:[{id:'e1',title:'إيجار المحل',category:'الإيجار',amount:8500,date:'2026-09-01',method:'bank'},{id:'e2',title:'فاتورة الكهرباء',category:'الماء والكهرباء',amount:1650,date:'2026-09-05',method:'cash'},{id:'e3',title:'مصاريف نقل',category:'تشغيلية',amount:920,date:'2026-09-07',method:'cash'}],
  revenues:[{id:'r1',title:'مبيعات نقدية',amount:22600,date:'2026-09-08',method:'cash'},{id:'r2',title:'تحصيل عميل',amount:12000,date:'2026-09-09',method:'bank'}],
  banks:[{id:'b1',name:'بنك الأمان',balance:46200},{id:'b2',name:'بنك التجارة',balance:18750}],
  salaries:[{id:'emp1',name:'محمد الأمين',job:'بائع',baseSalary:4200,active:true},{id:'emp2',name:'فاطمة بنت أحمد',job:'محاسبة',baseSalary:5800,active:true}]
};

function read(key){ try { const v=localStorage.getItem(`teyssir_${key}`); return v ? JSON.parse(v) : seed[key]; } catch { return seed[key]; } }
function id(){ return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`; }
const initial = Object.fromEntries(Object.keys(KEYS).map(k=>[k,read(k)]));

const ERPContext = createContext(null);
export function ERPProvider({children}){
  const [data,setData] = useState(initial);
  const [currency,setCurrency] = useState(()=>localStorage.getItem('teyssir_currency')||'MRU');
  const [lang,setLang] = useState(()=>localStorage.getItem('teyssir_lang')||'ar');
  const [theme,setTheme] = useState(()=>localStorage.getItem('teyssir_theme')||'system');
  const [toast,setToast] = useState(null);
  useEffect(()=>{ Object.entries(data).forEach(([k,v])=>localStorage.setItem(`teyssir_${k}`,JSON.stringify(v))); },[data]);
  useEffect(()=>{localStorage.setItem('teyssir_lang',lang); document.documentElement.lang=lang; document.documentElement.dir=lang==='ar'?'rtl':'ltr';},[lang]);
  useEffect(()=>{localStorage.setItem('teyssir_theme',theme); const actual=theme==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):theme; document.documentElement.dataset.theme=actual;},[theme]);
  useEffect(()=>{if(!toast)return; const t=setTimeout(()=>setToast(null),3200);return()=>clearTimeout(t)},[toast]);
  const notify=(message,type='success')=>setToast({message,type});
  const add=(collection,item)=>{setData(d=>({...d,[collection]:[...d[collection],{...item,id:id()}]}));notify(lang==='ar'?'تمت الإضافة بنجاح':'Ajouté avec succès');};
  const update=(collection,item)=>{setData(d=>({...d,[collection]:d[collection].map(x=>x.id===item.id?item:x)}));notify(lang==='ar'?'تم الحفظ بنجاح':'Enregistré avec succès');};
  const remove=(collection,itemId)=>{setData(d=>({...d,[collection]:d[collection].filter(x=>x.id!==itemId)}));notify(lang==='ar'?'تم الحذف':'Supprimé','warning');};
  const reset=()=>{setData(seed); notify(lang==='ar'?'تمت استعادة البيانات التجريبية':'Données de démonstration restaurées','warning');};
  const stats=useMemo(()=>{const sales=data.invoices.reduce((s,x)=>s+Number(x.total||0),0);const paid=data.invoices.reduce((s,x)=>s+Number(x.paid||0),0);const expenses=data.expenses.reduce((s,x)=>s+Number(x.amount||0),0);return {sales,paid,expenses,profit:paid-expenses,receivables:sales-paid,stock:data.products.reduce((s,x)=>s+Number(x.stock||0),0)}},[data]);
  return <ERPContext.Provider value={{data,add,update,remove,reset,stats,currency,setCurrency,lang,setLang,theme,setTheme,toast,notify}}>{children}</ERPContext.Provider>
}
export const useERP=()=>useContext(ERPContext);
export const formatMoney=(n,currency='MRU')=>`${Number(n||0).toLocaleString('fr-FR')} ${currency}`;
