import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface ClientsProps {
    id?: string;
    className?: string;
}

type Invoice = {
    name: string;
    email: string;
    address: string;
    invoice_id: number;
    invoice_date: string;
    total: number;
};

const Clients = ({ id = "clients", className }: ClientsProps) => {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/invoice/1")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch invoice");
                return res.json();
            })
            .then(data => {
                setInvoice(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <section
            id={id}
            className={clsx(
                "h-[100dvh] w-screen flex items-center justify-center bg-primary flex-shrink-0 relative overflow-hidden",
                className
            )}
        >
            {/* Background glow */}
            <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0.8),transparent_70%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00ff8899,transparent_50%)]" />
            </div>

            <div className="relative z-10 w-full max-w-6xl px-8">
                <div className="flex flex-col gap-12 lg:flex-row">

                    {/* LEFT: Static content */}
                    <div className="flex-1 space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="font-display text-[clamp(2.5rem,4vw,4.5rem)] font-bold leading-tight text-text"
                        >
                            Client Invoice
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-lg text-muted"
                        >
                            Invoice data fetched securely from MySQL using an Express API.
                        </motion.p>
                    </div>

                    {/* RIGHT: Dynamic invoice data */}
                    <div className="flex-1 flex flex-col gap-6">
                        {loading && <p className="text-muted">Loading invoice...</p>}
                        {error && <p className="text-red-500">{error}</p>}

                        {invoice && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-md p-6 space-y-3"
                            >
                                <p><strong>Name:</strong> {invoice.name}</p>
                                <p><strong>Email:</strong> {invoice.email}</p>
                                <p><strong>Address:</strong> {invoice.address}</p>

                                <hr className="border-white/10" />

                                <p><strong>Invoice ID:</strong> {invoice.invoice_id}</p>
                                <p><strong>Date:</strong> {invoice.invoice_date}</p>
                                <p className="text-xl font-bold">
                                    Total: ₹{invoice.total}
                                </p>
                            </motion.div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Clients;