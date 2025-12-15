import React from 'react';
import { useForm, Link, Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function CreateByContext({ context }) {
    const { tags, priorities, statuses } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        tag_ids: [],
        context_id: context.id,
        priority: '',
        status: '',
        due_date: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('notes.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-900">Crear Nota en "{context.name}"</h2>
            }
        >
            <Head title="Crear Nota" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6 transition-all">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Título <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Título de la nota"
                                />
                                {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contenido
                                </label>
                                <textarea
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
                                    rows="6"
                                    placeholder="Contenido de la nota"
                                />
                                {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content}</p>}
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Prioridad
                                </label>
                                <select
                                    value={data.priority}
                                    onChange={(e) => setData('priority', e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.priority ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="">-- Selecciona una prioridad --</option>
                                    {priorities.map(priority => (
                                        <option key={priority} value={priority}>
                                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                {errors.priority && <p className="text-red-600 text-sm mt-1">{errors.priority}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Estado
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="">-- Selecciona un estado --</option>
                                    {statuses.map(status => (
                                        <option key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
                            </div>

                            <input type="hidden" name="context_id" value={data.context_id} />

                            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                                <Link
                                    href={route('contexts.show', context.id)}
                                    className="inline-block px-5 py-2 rounded-lg text-gray-600 hover:text-gray-800 hover:underline transition"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
