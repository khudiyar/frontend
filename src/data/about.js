import C from "../constants/colors";

const timeline = [
  { year:1918, icon:"university",  title:"Tashkil topildi",       desc:"O'rta Osiyo davlat universiteti sifatida tashkil etildi." },
  { year:1940, icon:"bookOpen",    title:"Kengayish",              desc:"Yangi fakultetlar ochilib, talabalar soni 5000 ga yetdi." },
  { year:1960, icon:"microscope",  title:"Ilmiy markazga aylandi", desc:"SSSR ilmiy akademiyasi bilan hamkorlik o'rnatildi." },
  { year:1991, icon:"award",       title:"Milliy universitetga aylandi", desc:"Mustaqillikdan so'ng yangi status va nom berildi." },
  { year:2005, icon:"globe",       title:"Xalqaro hamkorlik",      desc:"UNESCO va xalqaro universitetlar bilan aloqalar o'rnatildi." },
  { year:2015, icon:"cpu",         title:"Raqamlashtirish",        desc:"Elektron ta'lim tizimi va raqamli kutubxona ishga tushirildi." },
  { year:2024, icon:"star",        title:"QS Reytingi",            desc:"QS World University Rankings da 600-650 o'ringa kirdi." },
];

const contactDepts = [
  { name:"Qabul komissiyasi",  icon:"clipboard",  phone:"(71) 246-08-96", email:"qabul@nuu.uz",         time:"Du-Shan: 9:00-17:00", color:C.orange },
  { name:"Xalqaro bo'lim",     icon:"globe",      phone:"(71) 246-09-10", email:"international@nuu.uz", time:"Du-Shan: 9:00-18:00", color:C.bright },
  { name:"Talabalar bo'limi",  icon:"graduation", phone:"(71) 246-07-55", email:"students@nuu.uz",      time:"Du-Ju: 9:00-17:00",   color:C.green  },
  { name:"Ilmiy bo'lim",       icon:"microscope", phone:"(71) 246-08-22", email:"science@nuu.uz",       time:"Du-Ju: 9:00-17:00",   color:C.purple },
];


export { timeline, contactDepts };
