import React from 'react'
import { APIClient } from '../apiClient';

export const APIContext = React.createContext({
  api: new APIClient(),
})