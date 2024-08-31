import axios from 'axios'
import { getContentType } from './api.helper'

export const baseUrl = 'https://thebloominghome.azurewebsites.net/api'

const axiosOptions = {
	baseURL: baseUrl,
	headers: getContentType()
}

export const axiosClassic = axios.create(axiosOptions)

export const instance = axios.create(axiosOptions)