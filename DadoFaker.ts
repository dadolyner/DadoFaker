import FirstNames from './Database/FirstNames'
import LastNames from './Database/LastNames'
import Addresses from './Database/Addresses'
import Countries from './Database/Countries'
import Quotes from './Database/Quotes'

type Coordinates = { lat: string; lng: string; }
type Token = { token: string; tokenExpiryDate: string }
type Quote = { quote: string; author: string; }

class DadoFaker {
    constructor() { }

    // Data Faker Functions
    async firstName(): Promise<string> { return FirstNames[Math.floor(Math.random() * FirstNames.length)] }
    async lastName(): Promise<string> { return LastNames[Math.floor(Math.random() * LastNames.length)] }
    async address(): Promise<string> { return Addresses[Math.floor(Math.random() * Addresses.length)] }
    async countries(): Promise<string> { return Countries[Math.floor(Math.random() * Countries.length)] }

    async uuid(version: number): Promise<string> {
        if (version < 3 || version > 5) { throw new Error('Invalid version') }
        return `xxxxxxxx-xxxx-${version}xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (char: string) => {
            const randomNumber = Math.random() * 16 | 0
            const uuid = (char === 'x') ? (randomNumber) : (randomNumber & 3 | 8)
            return uuid.toString(16)
        })
    }

    async email(first_name?: string, last_name?: string): Promise<string> {
        const EmailEndings = ['gmail.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'yahoo.com']
        if (!first_name || !last_name) {
            first_name = FirstNames[Math.floor(Math.random() * FirstNames.length)].toLowerCase()
            last_name = LastNames[Math.floor(Math.random() * LastNames.length)].toLowerCase()
        }
        return `${first_name.toLowerCase()}.${last_name.toLowerCase()}@${EmailEndings[Math.floor(Math.random() * EmailEndings.length)]}`
    }

    async password(length: number): Promise<string> {
        const characters = 'abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789_!@#$%&()'
        let password: string = ''
        for (let i = 0; i < length; i++) password += characters.charAt(Math.floor(Math.random() * characters.length))
        return password
    }

    async birthDate(): Promise<string> {
        const rng: number = Math.floor(Math.random() * 36500)
        const date: Date = new Date()
        date.setDate(date.getDate() - rng)
        return date.toLocaleDateString()
    }

    async phoneNumber(format: string): Promise<string> {
        return format.replace(/x/g, () => { return Math.floor(Math.random() * 10).toString() })
    }

    async token(length: number, minutes: number): Promise<Token> {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const tokenExpiryDate = new Date(new Date().getTime() + (minutes * 60 * 1000)).toLocaleDateString();
        let token = ''
        for (let i = 0; i < length; i++) token += chars[Math.floor(Math.random() * chars.length)]
        return { token, tokenExpiryDate }
    }

    async coordinations(): Promise<Coordinates> {
        const lat = (Math.random() * 180 - 90).toFixed(5)
        const lng = (Math.random() * 360 - 180).toFixed(5)
        return { lat, lng }
    }

    async quote(): Promise<Quote> {
        const randomQuote = Quotes[Math.floor(Math.random() * Quotes.length)]
        return { quote: randomQuote.text, author: randomQuote.author }
    }

    async image(isAvatar: boolean, filter?: string): Promise<string> {
        if (isAvatar) { return `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${Math.floor(Math.random() * 1000)}.jpg` }
        else { return `https://loremflickr.com/640/480/${filter}` }
    }

    async rand(min: number, max: number): Promise<number> { return Math.floor(Math.random() * (max - min + 1)) + min }

    async color(): Promise<string> { return `#xxxxxx`.replace(/x/g, () => { return Math.floor(Math.random() * 16).toString(16) }) }

    // Premade Data Objects Functions
    async CreateUser(): Promise<object> {
        const id = await this.uuid(4)
        const first_name = await this.firstName()
        const last_name = await this.lastName()
        const email = await this.email(first_name, last_name)
        const username = `${first_name.toLowerCase()}_${last_name.toLowerCase()}`
        const password = await this.password(16)
        const birthdate = await this.birthDate()
        const address = await this.address()
        const country = await this.countries()
        const phone_number = await this.phoneNumber('xxx xxx xxx')

        return { id, first_name, last_name, email, username, password, birthdate, address, country, phone_number }
    }

    async CreateLocation(): Promise<object> {
        const id = await this.uuid(4)
        const place = await this.address()
        const country = await this.countries()

        const coordinates = await this.coordinations()
        const latitude = coordinates.lat
        const longitude = coordinates.lng

        return { id, place, country, latitude, longitude }
    }
}

export default DadoFaker