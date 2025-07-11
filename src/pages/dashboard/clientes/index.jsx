import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useClientStore } from "@/store/useClientStore";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ClientsPage() {
  const { user } = useAuthStore();
  const { list, fetchAll, add, update, remove } = useClientStore();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });

  /* ───────── fetch una sola vez ───────── */
  useEffect(() => {
    fetchAll(user.uid);
  }, [user.uid, fetchAll]);

  /* ───────── handlers ───────── */
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await update(editing.id, form);
    } else {
      await add({ uid_owner: user.uid, ...form });
    }
    reset();
  };

  const reset = () => {
    setForm({ nombre: "", email: "", telefono: "" });
    setEditing(null);
    setOpen(false);
  };

  const handleEdit = (client) => {
    setEditing(client);
    setForm({ nombre: client.nombre, email: client.email, telefono: client.telefono });
    setOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Clientes</h2>
        <Button onClick={() => setOpen(true)}>+ Nuevo cliente</Button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2 w-32">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-2">{c.nombre}</td>
                <td className="px-4 py-2">{c.email}</td>
                <td className="px-4 py-2">{c.telefono}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button size="sm" onClick={() => handleEdit(c)}>
                    Editar
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => remove(c.id)}>
                    Borrar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Formulario */}
      <Dialog open={open} onOpenChange={reset} title={editing ? "Editar cliente" : "Nuevo cliente"}>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {[
            { name: "nombre", label: "Nombre" },
            { name: "email", label: "Email" },
            { name: "telefono", label: "Teléfono" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block mb-1 text-sm font-medium">{label}</label>
              <input
                type="text"
                name={name}
                value={form[name]}
                onChange={handleChange}
                required={name === "nombre"}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          ))}

          <div className="flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={reset}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
