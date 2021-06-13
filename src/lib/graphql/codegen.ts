export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any;
};

export type Coach = {
  __typename?: 'Coach';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  handle: Scalars['String'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  isAssistant?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
  team?: Maybe<Team>;
};

export type ColorScheme = {
  __typename?: 'ColorScheme';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  primary: Scalars['String'];
  secondary: Scalars['String'];
  teamId?: Maybe<Scalars['String']>;
  team?: Maybe<Team>;
};

export type CreateCoachInput = {
  handle: Scalars['String'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  isAssistant?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
};

export type CreateColorSchemeInput = {
  primary: Scalars['String'];
  secondary: Scalars['String'];
  teamId?: Maybe<Scalars['String']>;
};

export type CreatePlayerInput = {
  handle: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  height: Scalars['String'];
  weight: Scalars['String'];
  number?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
};

export type CreateTeamInput = {
  handle: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  city: Scalars['String'];
  abbreviation: Scalars['String'];
  logo: Scalars['String'];
  logoSlug: Scalars['String'];
  wins?: Maybe<Scalars['Int']>;
  losses?: Maybe<Scalars['Int']>;
  winPercentage?: Maybe<Scalars['Float']>;
  conference: Scalars['String'];
  division: Scalars['String'];
  established: Scalars['String'];
};





export type Mutation = {
  __typename?: 'Mutation';
  createCoach: Coach;
  updateCoach: Coach;
  deleteCoach: Coach;
  createColorScheme: ColorScheme;
  updateColorScheme: ColorScheme;
  deleteColorScheme: ColorScheme;
  createPlayer: Player;
  updatePlayer: Player;
  deletePlayer: Player;
  createTeam: Team;
  updateTeam: Team;
  deleteTeam: Team;
};


export type MutationCreateCoachArgs = {
  input: CreateCoachInput;
};


export type MutationUpdateCoachArgs = {
  id: Scalars['String'];
  input: UpdateCoachInput;
};


export type MutationDeleteCoachArgs = {
  id: Scalars['String'];
};


export type MutationCreateColorSchemeArgs = {
  input: CreateColorSchemeInput;
};


export type MutationUpdateColorSchemeArgs = {
  id: Scalars['String'];
  input: UpdateColorSchemeInput;
};


export type MutationDeleteColorSchemeArgs = {
  id: Scalars['String'];
};


export type MutationCreatePlayerArgs = {
  input: CreatePlayerInput;
};


export type MutationUpdatePlayerArgs = {
  id: Scalars['String'];
  input: UpdatePlayerInput;
};


export type MutationDeletePlayerArgs = {
  id: Scalars['String'];
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationUpdateTeamArgs = {
  id: Scalars['String'];
  input: UpdateTeamInput;
};


export type MutationDeleteTeamArgs = {
  id: Scalars['String'];
};

export type Player = {
  __typename?: 'Player';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  handle: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  height: Scalars['String'];
  weight: Scalars['String'];
  number?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
  team?: Maybe<Team>;
};

export type Query = {
  __typename?: 'Query';
  redwood?: Maybe<Redwood>;
  coaches: Array<Coach>;
  coach?: Maybe<Coach>;
  colorSchemes: Array<ColorScheme>;
  colorScheme?: Maybe<ColorScheme>;
  players: Array<Player>;
  player?: Maybe<Player>;
  teams: Array<Team>;
  team?: Maybe<Team>;
};


export type QueryCoachArgs = {
  id: Scalars['String'];
};


export type QueryColorSchemeArgs = {
  id: Scalars['String'];
};


export type QueryPlayerArgs = {
  id: Scalars['String'];
};


export type QueryTeamArgs = {
  id: Scalars['String'];
};

export type Redwood = {
  __typename?: 'Redwood';
  version?: Maybe<Scalars['String']>;
  currentUser?: Maybe<Scalars['JSON']>;
  prismaVersion?: Maybe<Scalars['String']>;
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  handle: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  city: Scalars['String'];
  abbreviation: Scalars['String'];
  logo: Scalars['String'];
  logoSlug: Scalars['String'];
  wins?: Maybe<Scalars['Int']>;
  losses?: Maybe<Scalars['Int']>;
  winPercentage?: Maybe<Scalars['Float']>;
  conference: Scalars['String'];
  division: Scalars['String'];
  established: Scalars['String'];
  coaches: Array<Maybe<Coach>>;
  colorScheme?: Maybe<ColorScheme>;
  players: Array<Maybe<Player>>;
};


export type UpdateCoachInput = {
  handle?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  isAssistant?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
};

export type UpdateColorSchemeInput = {
  primary?: Maybe<Scalars['String']>;
  secondary?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
};

export type UpdatePlayerInput = {
  handle?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
};

export type UpdateTeamInput = {
  handle?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  abbreviation?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  logoSlug?: Maybe<Scalars['String']>;
  wins?: Maybe<Scalars['Int']>;
  losses?: Maybe<Scalars['Int']>;
  winPercentage?: Maybe<Scalars['Float']>;
  conference?: Maybe<Scalars['String']>;
  division?: Maybe<Scalars['String']>;
  established?: Maybe<Scalars['String']>;
};
