/* ====== OVDE SE MENJAJU DOGAĐAJI I POSLOVI ======
   Dogadjaj: kopiraj jedan red, promeni datum (GGGG-MM-DD), naslov, opis...
   type: 'Svirka' | 'Ples' | 'Žurka' | 'Specijal'
   img je opcionalno (plakat u assets/img/). Prošli događaji se automatski premeštaju u arhivu. */
const EVENTS=[
 {date:'2026-09-26',time:'',type:'Ples',title:'Latino Party',desc:'Večer latino ritmova: salsa, bachata i kizomba. Dobrodošli su i plesači i posmatrači.',price:'Ulaz 300 din',img:'assets/img/poster.webp'}
];
/* Poslovi: obriši red kad je pozicija popunjena, dodaj novi kad treba. */
const JOBS=[
 {title:'Konobar / Konobarica',type:'Rad u smenama',
  desc:'Konobari su lice Lagune i prvi kontakt sa gostima. Tražimo osobu koja voli rad sa ljudima i koja će svakom gostu, od jutarnje kafe do večernje smene, pružiti ljubazno i pouzdano iskustvo.',
  duties:['Prijem gostiju i preporuka menija','Uzimanje porudžbina, serviranje hrane i pića','Održavanje reda i čistoće u sali','Rad sa kasom i naplata'],
  reqs:['Iskustvo u ugostiteljstvu je prednost, ali nije uslov','Komunikativnost, ljubaznost i uredan izgled','Spremnost na rad u smenama, uključujući vikende']},
 {title:'Šanker / Šankerica',type:'Rad u smenama',
  desc:'Šank je srce lokala. Tražimo osobu koja pouzdano i dosledno priprema kafu i piće, koja održava ritam rada i u najprometnijim večerima i koja sa gostima ume da razmeni koju reč.',
  duties:['Priprema kafe, koktela i bezalkoholnih pića','Praćenje zaliha i popuna inventara','Održavanje šanka i opreme','Saradnja sa konobarima i kuhinjom'],
  reqs:['Poznavanje pripreme kafe i osnovnih koktela','Preciznost, brzina i odgovornost','Spremnost na rad u smenama, uključujući vikende']},
 {title:'Kuvar / Kuvarica',type:'Rad u smenama',
  desc:'Kuhinja Lagune služi burgere, wrap i grickalice koji svakog dana moraju da budu jednako dobri. Tražimo kuvara koji radi organizovano i pažljivo, uz poštovanje standarda kvaliteta i higijene.',
  duties:['Priprema jela po utvrđenim receptima','Održavanje kvaliteta i doslednosti porcija','Poštovanje HACCP standarda i higijene kuhinje','Preuzimanje i skladištenje namirnica'],
  reqs:['Iskustvo u kuhinji je prednost','Organizovanost i sposobnost rada u prometnim satima','Timski duh i pouzdanost']}
];
const IG='https://www.instagram.com/laguna_caffe_bar/',MAIL='lagunacaffebarnis@gmail.com';
