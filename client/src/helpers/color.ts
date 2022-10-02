export function getColor(first: string, last: string) {

  const firstCode = first.charCodeAt(0);
  const lastCode = last.charCodeAt(0);

  const firstColor = `rgb(${Math.floor((255 - firstCode) * 6) % 255}, ${Math.floor(255 - firstCode) / 2}, ${255 - (255 % firstCode)})`;
  const lastColor = `rgb(${Math.floor((Math.tanh(lastCode) * (255 + lastCode)) * 2) % 255}, ${255 % lastCode * 7 % 255}, ${Math.floor(Math.tan(lastCode) * lastCode / 3) % 255})`;

  return `linear-gradient(-45deg, ${firstColor}, ${lastColor})`;
}