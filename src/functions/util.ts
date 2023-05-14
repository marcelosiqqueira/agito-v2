export async function miniFetch<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data as T;
  } catch (e) {
    console.error(e);
    throw new Error('Erro ao realizar requisição.');
  }
}