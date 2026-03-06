import C from "../constants/colors";

const admissionSteps = [
  { n:1, icon:"fileText",  title:"Ariza topshirish",  desc:"Online yoki shaxsan qabul komissiyasiga ariza topshiring." },
  { n:2, icon:"clipboard", title:"Hujjatlar",          desc:"Shahodatnoma, pasport, foto va tibbiy ma'lumotnoma." },
  { n:3, icon:"bookOpen",  title:"Imtihon",            desc:"Fanlar bo'yicha kirish imtihonlarini topshiring." },
  { n:4, icon:"barChart",  title:"Natijalar",          desc:"Imtihon natijalari e'lon qilinib, ro'yxat shakllantiriladi." },
  { n:5, icon:"checkCircle",title:"Ro'yxatdan o'tish", desc:"Qabul qilinganlar shartnoma imzolaydi va to'lov qiladi." },
];

const programs = [
  { name:"Matematika",      degree:"Bakalavriat", dur:"4 yil", lang:"O'zb/Rus",     grant:10, kontrakt:12700000, score:68 },
  { name:"Fizika",          degree:"Bakalavriat", dur:"4 yil", lang:"O'zb/Rus",     grant:8,  kontrakt:12700000, score:64 },
  { name:"Informatika",     degree:"Bakalavriat", dur:"4 yil", lang:"O'zb/Rus/Eng", grant:15, kontrakt:14200000, score:72 },
  { name:"Iqtisodiyot",     degree:"Bakalavriat", dur:"4 yil", lang:"O'zb/Rus",     grant:12, kontrakt:13500000, score:70 },
  { name:"Matematika",      degree:"Magistratura",dur:"2 yil", lang:"O'zb/Rus",     grant:5,  kontrakt:15000000, score:70 },
  { name:"Sun'iy intellekt",degree:"Magistratura",dur:"2 yil", lang:"O'zb/Eng",     grant:6,  kontrakt:16500000, score:74 },
  { name:"Biofizika",       degree:"Doktorantura",dur:"3 yil", lang:"O'zb/Rus",     grant:3,  kontrakt:18000000, score:80 },
];

export { admissionSteps, programs };
