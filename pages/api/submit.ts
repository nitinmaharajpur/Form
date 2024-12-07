import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from "googleapis";

type SheetForm = {
    name: string
    email: string
    age: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests allowed' })
    }

    const body = req.body as SheetForm

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
            },
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/spreadsheets'
            ]
        })

        const sheets = google.sheets({
            auth,
            version: 'v4'
        });

        // Determine Status
        const status = body.age >= 60 ? 'Senior' : 'Junior';

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'A2:D2',  // Start appending data from the second row
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [body.name, body.email, body.age, status] // Add age and status
                ]
            }
        });

        return res.status(201).json({
            message: "Form submitted successfully!",
            data: response.data
        })
    } 
    catch (error) {
        // Ensure 'error' is typed correctly
        if (error instanceof Error) {
            // Handle as an Error object
            return res.status(500).send({ message: error.message });
        }

        // Handle as a generic case
        return res.status(500).send({ message: 'An unknown error occurred' });
    }
}
