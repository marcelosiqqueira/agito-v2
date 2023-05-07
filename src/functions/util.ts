export async function miniFetch(url: string) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}
