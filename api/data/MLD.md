Relational Model (MLD)

User (
  id PK,
  email UNIQUE,
  pseudo UNIQUE,
  name,
  password
)

Team (
  id PK,
  name,
  description,
  user_id FK → User.id
)

Pokemon (
  id PK,
  name,
  hp,
  attack,
  defense,
  speed
)

Type (
  id PK,
  name UNIQUE
)

Team_Pokemon (
  team_id PK, FK → Team.id,
  pokemon_id PK, FK → Pokemon.id
)

Pokemon_Type (
  pokemon_id PK, FK → Pokemon.id,
  type_id PK, FK → Type.id
)