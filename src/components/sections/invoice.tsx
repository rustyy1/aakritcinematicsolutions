import { useEffect, useState } from "react";

type Invoice = {
    name: string;
    email: string;
    address: string;
    invoice_id: number;
    invoice_date: string;
    total: number;
};

export default function Invoice() {
    const [invoice, setInvoice] = useState<Invoice | null>(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/invoice/1")
            .then(res => res.json())
            .then(data => setInvoice(data));
    }, []);

    if (!invoice) return <p>Loading...</p>;

    return (
        <div style={{ width: "600px", margin: "auto", border: "1px solid #000", padding: "20px" }}>
            <h2>Invoice #{invoice.invoice_id}</h2>
            <p><strong>Date:</strong> {invoice.invoice_date}</p>

            <hr />

            <h3>Client Details</h3>
            <p>{invoice.name}</p>
            <p>{invoice.email}</p>
            <p>{invoice.address}</p>

            <hr />

            <h3>Total Amount</h3>
            <h2>₹ {invoice.total}</h2>
        </div>
    );
}