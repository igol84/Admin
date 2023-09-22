export const invokeIf = (condition: Boolean, fnTrue: any, fnFalse: any) => condition ? fnTrue() : fnFalse()

export function generate_url(str: string) {
  let url = str.replace(/\s+/gi, '-');
  url = translit(url);
  url = url.replace(/[^0-9a-z_\-]+/gi, '').toLowerCase();
  return url;
}

function translit(str: string) {
  const ru = ("А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я").split("-")
  const en = ("A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya").split("-")
  let res = '';
  for (let i = 0, l = str.length; i < l; i++) {
    const s = str.charAt(i), n = ru.indexOf(s);
    if (n >= 0) {
      res += en[n];
    } else {
      res += s;
    }
  }
  return res;
}

export function makeId(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

interface Name {
  name: string
  newName: string
}

export const renameName = (value: string) => {
  const images: Name[] = [
    {name: 'main.jpg', newName: '02.jpg'}, {name: 'main_b.jpg', newName: '03.jpg'},
    {name: 'main_s.jpg', newName: '01.jpg'}, {name: 'bottom.jpg', newName: '12.jpg'},
    {name: 'bottom_b.jpg', newName: '13.jpg'}, {name: 'bottom_s.jpg', newName: '11.jpg'},
    {name: 'front.jpg', newName: '22.jpg'}, {name: 'front_b.jpg', newName: '23.jpg'},
    {name: 'front_s.jpg', newName: '21.jpg'}, {name: 'back.jpg', newName: '32.jpg'},
    {name: 'back_b.jpg', newName: '33.jpg'}, {name: 'back_s.jpg', newName: '31.jpg'},
    {name: 'smal.jpg', newName: '4.jpg'}, {name: 'my.jpg', newName: '5.jpg'}
  ]
  let newName = value
  images.forEach(image => {
    if (value.endsWith(image.name)) {
      newName = image.newName
    }
  })
  return newName
}

