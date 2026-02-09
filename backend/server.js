import express from "express";
import cors from "cors";
import supabase from "./supabase.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/invoice/:id", async (req, res) => {
    const invoiceId = req.params.id;

    const { data, error } = await supabase
        .from("invoices")
        .select(`
      id,
      invoice_date,
      total,
      clients (
        name,
        email,
        address
      )
    `)
        .eq("id", invoiceId)
        .single();

    if (error) {
        return res.status(500).json(error);
    }

    res.json({
        invoice_id: data.id,
        invoice_date: data.invoice_date,
        total: data.total,
        name: data.clients.name,
        email: data.clients.email,
        address: data.clients.address
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});