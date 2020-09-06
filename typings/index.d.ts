declare module '@aero/ksoft' {

	interface Album {
		mame: string;
		id?: string;
		year: number;
		artist?: Artist;
		tracks?: Track[];
	}

	interface Artist {
		name: string;
		id?: string;
		albums?: Album[];
		tracks?: Track[];
		primary?: boolean;
	}

	interface Artist {
		name: string;
		id?: string;
		albums?: Album[];
		tracks?: Track[];
	}

	export class Ban {
		user: BannedUser;
		moderator: string;
		reason: string;
		proof: string
		active?: boolean;
		appealable?: boolean;

		setUser(id: string): Ban;
		setModerator(id: string): Ban;
		setReason(reason: string, proof: string): Ban;
	}

	interface BanAPIResponse {
		success: boolean;
		message?: string;
	}

	interface BannedUser {
		id: string;
		username?: string;
		discriminator?: string;
	}

	interface Connection {
		artists: string[];
		album: string[];
		track: string;
	}

	interface Conversion {
		value: number;
		pretty: string;
	}

	interface DeezerConnection extends Connection {
		type: 'deezer';
	}

	interface Image {
		tag?: Tag;
		url: string;
		id?: string;
	}

	interface IPReport {
		location: Location;
		map: string;
	}

	interface Line {
		timestamp: number;
		duration: number;
		text: string;
	}

	interface Location {
		lat: number;
		lon: number;
		address: string;
	}

	interface Lyrics extends String {
		private text: string;
		lines?: Line[];
	}

	interface RedditImage extends Image {
		post: RedditPost;
	}

	interface RedditPost {
		title: string;
		subreddit: string;
		link: string;
		upvotes: number;
		downvotes: number;
		author: string;
		comments: number;
		awards: number;
	}

	interface SpotifyAlbum {
		title: string;
		link: string;
		art: string;
	}

	interface SpotifyArtist {
		name: string;
		link: string;
	}

	interface SpotifyConnection extends Connection {
		type: 'spotify';
	}

	interface SpotifyTrack {
		id: string;
		link: string;
		title: string;
		album: SpotifyAlbum;
		artists: SpotifyArtist[];
	}

	interface Suggestion {
		title: string;
		youtube: YouTubeTrack;
		spotify: SpotifyTrack;
	}

	interface Tag {
		name: string;
		nsfw: boolean;
	}

	interface Track {
		name: string;
		id: string;
		artists?: Artist[];
		albums?: Album[];
		lyrics: Lyrics;
		artwork: string;
		connections?: (SpotifyConnection | DeezerConnection)[];
		gain?: number;
		bpm?: number;
	}

	interface WeatherReport {
		location: Location;
		icon: string;
		summary: string;
		temperature: number;
		uvIndex: number;
		humidity: number;
		pressure: number;
		precipPossibility: number;
	}

	interface WikiHowArticle {
		title: string;
		link: string;
	}

	interface WikiHowImage extends Image {
		article: WikiHowArticle;
	}

	interface YouTubeTrack {
		id: string;
		link: string;
		title: string;
		thumbnail: string;
		description: string;
	}

	interface RandomImagePathOptions {
		nsfw: boolean;
	}

	interface RedditImagePathOptions {
		removeNSFW: boolean;
		span: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
	}

	interface WeatherKumoPathOptions {
		units: 'si' | 'us' | 'uk2' | 'ca' | 'auto';
		lang: 'ar' | 'az' | 'be' | 'bg' | 'bs' |
		'ca' | 'cs' | 'da' | 'de' | 'el' |
		'en' | 'es' | 'et' | 'fi' | 'fr' |
		'he' | 'hr' | 'hu' | 'id' | 'is' |
		'it' | 'ja' | 'ka' | 'ko' | 'kw' |
		'nb' | 'nl' | 'no' | 'pl' | 'pt' |
		'ro' | 'ru' | 'sk' | 'sl' | 'sr' |
		'sv' | 'tet' | 'tr' | 'uk' |
		'x-pig-latin' | 'zh' | 'zh-tw';
	}

	interface GetLyricsPathOptions {
		textOnly: boolean;
	}

	interface SearchLyricsPathOptions {
		textOnly: boolean;
		limit: number;
	}

	interface RecommendationsMusicPathOptions {
		limit: number;
	}


	interface BansRoute {
		add(ban: Ban): Promise<BanAPIResponse>;
		check(user: string): Promise<boolean>;
		check(users: string[]): Promise<string[]>;
		info(user: string): Promise<Ban> | void;
		info(users: string[]): Promise<Ban[]>;
	}

	interface ImagesRoute {
		aww(): Promise<RedditImage>;
		image(id: string): Promise<Image>;
		meme(): Promise<RedditImage>;
		nsfw(gifs: boolean): Promise<RedditImage>;
		random(tag: string, options: RandomImagePathOptions): Promise<Image>;
		reddit(subreddit: string, options: RedditImagePathOptions): Promise<RedditImage>;
		tags(): Promise<Tag[]>;
		wikihow(): Promise<WikiHowImage>;
	}

	interface KumoRoute {
		convert(value: number, from: string, to: string): Promise<Conversion>;
		geoip(ip: string): Promise<IPReport>;
		weather(query: string, options: WeatherKumoPathOptions): Promise<WeatherReport>;
	}

	interface LyricsRoute {
		get(query: string, options: GetLyricsPathOptions): Promise<Track>;
		search(query: string, options: SearchLyricsPathOptions): Promise<Track[]>;
	}

	interface MusicRoute {
		album(id: string): Promise<Album>;
		artist(id: string): Promise<Artist>;
		track(id: string): Promise<Track>;
		recommendations(provider: 'spotify' | 'youtube' | 'youtube_ids' | 'youtube_titles', tracks: string[], token: string, options: RecommendationsMusicPathOptions): Promise<Suggestion[]>;
	}

	export class KSoftClient {
		constructor(token: string);
		public bans: BansRoute;
		public images: ImagesRoute;
		public kumo: KumoRoute;
		public lyrics: LyricsRoute;
		public music: MusicRoute;
	}

}