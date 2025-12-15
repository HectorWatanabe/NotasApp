import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit() {
    const { note, tags, contexts, priorities, statuses } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        title: note.title || '',
        content: note.content || '',
        tag_ids: note.tags?.map(tag => tag.id) ?? [],
        context_id: note.context_id || '',
        priority: note.priority || '',
        status: note.status || '',
        due_date: note.due_date || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('notes.update', note.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold text-gray-900">Editar Nota</h2>}
        >
            <Head title="Editar Nota" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-lg rounded-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label htmlFor="title" className="block font-semibold mb-1">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                                />
                                {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                            </div>

                            <div>
                                <label htmlFor="content" className="block font-semibold mb-1">
                                    Descripción
                                </label>
                                <textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    rows={4}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                                />
                                {errors.content && <div className="text-red-500 text-sm mt-1">{errors.content}</div>}
                            </div>

                            {/* Fecha de vencimiento */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fecha de vencimiento
                                </label>
                                <input
                                    type="datetime-local"
                                    value={data.due_date}
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.due_date ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.due_date && <p className="text-red-600 text-sm mt-1">{errors.due_date}</p>}
                            </div>

                            <div>
                                <label htmlFor="tag_ids" className="block font-semibold mb-1">
                                    Etiquetas
                                </label>
                                <select
                                    id="tag_ids"
                                    multiple
                                    value={data.tag_ids}
                                    onChange={(e) => {
                                        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                                        setData('tag_ids', selectedOptions);
                                    }}
                                    className="w-full border-gray-300 rounded-lg shadow-sm h-32"
                                >
                                    {tags.map(tag => (
                                        <option key={tag.id} value={tag.id}>
                                            {tag.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.tag_ids && <div className="text-red-500 text-sm mt-1">{errors.tag_ids}</div>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="priority" className="block font-semibold mb-1">
                                        Prioridad
                                    </label>
                                    <select
                                        id="priority"
                                        value={data.priority}
                                        onChange={(e) => setData('priority', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm"
                                    >
                                        <option value="">-- Selecciona una prioridad --</option>
                                        {priorities.map((priority) => (
                                            <option key={priority} value={priority}>
                                                {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.priority && <div className="text-red-500 text-sm mt-1">{errors.priority}</div>}
                                </div>

                                <div>
                                    <label htmlFor="status" className="block font-semibold mb-1">
                                        Estado
                                    </label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm"
                                    >
                                        <option value="">-- Selecciona una prioridad --</option>
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.status && <div className="text-red-500 text-sm mt-1">{errors.status}</div>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 mt-6">
                                <Link
                                    href={route('contexts.show', note.context.id)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg transition"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
