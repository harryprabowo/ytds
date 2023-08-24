import { supabase } from "../../utils/client";

export default async (req, res) => {
    if (req.method === 'GET') {
        const { data, error } = await supabase.from('venue').select('*')

        if (error) {
            return res.status(500).json({ message: error })
        }

        return res.status(200).json({ data })
    }
}