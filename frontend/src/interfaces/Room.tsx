export default interface RoomInterface {
	id?: number;
	code?: string;
	host?: string;
	is_host?: boolean;
	session?: string;
	guest_can_pause: boolean;
	votes_to_skip: number;
	created_at?: string;
}
