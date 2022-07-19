# Package that generate fake data

### Description
This package create fake data for testing and it is fully async.

## Usage

```ts
import DadoFaker from "@dadolyner/faker";

const Faker = new DadoFaker()
const generateUser = async () => {
    const user = await Faker.CreateUser()
    console.log(user)
}
generateUser()
```

## Functions

| Function | Description | Parameters | Return |
|----------|-------------|------------|--------|
| firstName() | generates a random first name | | string |
| lastName() | generates a random last name | | string |
| address() | generates a random address | | string |
| countries() | generates a random country | | string |
| uuid() | generates a uuid based on version(3-5) | version: integer | string |
| email(first_name?: string, last_name?: string) | generates a random email or combined first and lastname | first_name: string, last_name: string | string |
| password(length: number) | generates a random password of provided length | length: number | string |
| birthDate() | generates a random birth date | | string |
| phoneNumber(format: string) | generates a random phone number of provided format "(xxx)-xxxx" -> x will be replaced with a number | format: string | string |
| token(length: number, minutes: number) | generates a random token of provided length and expiration length in minutes | length: number, minutes: number | { token: string, tokenExpiryDate: string } |
| coordinations() | generates a random coordination | | { lat: number, lng: number } |
| quote() | generates a random quote | | { quote: string, author: string } |
| image(isAvatar: boolean, filter?: string) | generates a random image of provided filter and if is avatar will return random profile image | isAvatar: boolean, filter: string | string |
| rand(min: number, max: number) | generates a random number between min and max | min: number, max: number | number |
| color() | generates a random color | | string |

## Premade functions

| Function | Description | Parameters | Return |
|----------|-------------|------------|--------|
| CreateUser() | creates a user object | | { firstName: string, lastName: string, email: string, password: string, birthDate: string, phoneNumber: string, address: string, country: string, uuid: string } |
| CreateLocation() | creates a location object | | { id: string, place: string, country: string, coordinates: { lat: number, lng: number }, latitude: number, longitude: number } |