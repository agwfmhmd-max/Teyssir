# Teyssir ERP

نسخة حديثة من **Teyssir ERP** مبنية على React 19 وVite وReact Router، مع الحفاظ على أصول المشروع السابق ومنطق البيانات القابل للترحيل. الواجهة Mobile First وتدعم العربية RTL والفرنسية، Light/Dark، PWA، Vercel وCapacitor Android.

## التشغيل

```bash
npm install
npm run dev
npm run build
npm run preview
```

يُنتج البناء النهائي داخل `dist`، وملف `vercel.json` يضبط SPA fallback تلقائياً.

## البيانات والتكامل المستقبلي

يستخدم التطبيق حالياً localStorage بنفس أسلوب النسخة الأصلية مع مفاتيح `teyssir_products` و`teyssir_customers` وغيرها، ويهيئ بيانات عرض عند التشغيل الأول. طبقة `src/context/ERPContext.jsx` هي نقطة الاستبدال الوحيدة لإضافة Supabase أو Firebase أو REST API مستقبلاً، ولا تحتوي الواجهة على أسرار أو مفاتيح خاصة.

تم نقل ملفات النسخة السابقة إلى `legacy/` للمراجعة والرجوع الآمن، مع إبقاء أسماء مجموعات Firebase الأصلية موثقة داخل الكود القديم.

## Android / Google Play

```bash
npm install
npm run cap:sync
npx cap add android   # نفّذها مرة واحدة إذا لم يوجد مجلد android
npx cap open android
```

Application ID هو `com.teyssir.erp`. من Android Studio اضبط نسخة الإصدار والأيقونات والتوقيع، ثم أنشئ **Signed Android App Bundle (AAB)** للنشر على Google Play. إعدادات Status Bar وKeyboard وSplash موجودة في `capacitor.config.ts`، ويمكن تخصيصها بعد `cap sync`.

## ملاحظات النشر

أضف قيم الربط الفعلية فقط في متغيرات البيئة على Vercel أو الخادم، اعتماداً على `.env.example`. لا تضع Service Account أو Private Key في Frontend. التطبيق يعمل Offline للبيانات المحلية، ويحتفظ بـ service worker القديم كمرجع داخل `legacy/`.
