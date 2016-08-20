export class Dayoff {
	constructor(
		public id: number,
		public employee: string,
		public end_date: string,
		public end_time: string,
		public start_date: string,
		public start_time: string
	) {}
}
