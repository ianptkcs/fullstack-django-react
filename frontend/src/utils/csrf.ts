// utils/csrf.js
export async function fetchCsrfToken() {
	const csrfTokenApi = process.env.NEXT_PUBLIC_CSRF_TOKEN_API;
	const response = await fetch(`${csrfTokenApi}`, {
		method: 'GET',
		credentials: 'include', // Inclui cookies na requisição
	});

	if (response.ok) {
		const data = await response.json();
		return data.csrfToken;
	} else {
		throw new Error('Falha ao buscar o token CSRF');
	}
}
