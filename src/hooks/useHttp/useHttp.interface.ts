export interface IRequestData {
	url: string
	method?: RequestInit['method']
	headers?: RequestInit['headers']
	body?: RequestInit['body']
}
