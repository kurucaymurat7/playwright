/*
önce localde jenkins yüklenir,
daha sonra yeni bir job açılır
dosya uzantısı olarak localde projenin bulunduğu dizin verilir

package.json içine yazdığımız scriptler kullanılır. 

npm run regression
npm run apiTests
npm run Web





ayrıca, jenkinste Windows Batch komut kullanılarak testler parametreli olarak da çalıştırılabilir. 

Jenkins'te
- Bu projeyi parametrik hale getir
- Name: Script
- Choices : regression, webTests, apiTests, SafariNewConfig

Windows batch komutu çalıştır : npm run "%Script%"

Jenkins'te Parametreli Yapılandır dediğimizde karşımıza çıkan parametrelerle çalıştırabiliriz.

*/