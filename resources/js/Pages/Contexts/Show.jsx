import React from 'react';
import { Link, Head, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ context }) {
    const { notes, flash = {} } = usePage().props;
    const { delete: deleteNote } = useForm();

    const handleDelete = (noteId) => {
        if (confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
            deleteNote(route('notes.destroy', noteId));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold text-gray-900">Detalle del Contexto</h2>}
        >
            <Head title="Detalle del Contexto" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white p-6 shadow-lg rounded-2xl space-y-6">

                        {/* Información del contexto */}
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 uppercase">Nombre</p>
                                <p className="text-xl font-semibold text-gray-800">{context.name}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 uppercase">Descripción</p>
                                <p className="text-base text-gray-700 whitespace-pre-line">
                                    {context.description || '—'}
                                </p>
                            </div>
                        </div>

                        {/* Botón de volver */}
                        <div className="pt-4 border-t border-gray-200 flex justify-end">
                            <Link
                                href={route('contexts.index')}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                ← Volver a la lista
                            </Link>
                        </div>

                        {/* Mensaje flash */}
                        {flash.success && (
                            <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg">
                                ✅ {flash.success}
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Notas asociadas</h3>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    href={route('notes.create.byContext', context.id)}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg shadow transition-all text-center"
                                >
                                    + Nueva Nota
                                </Link>
                            </div>
                        </div>

                        {/* Lista de notas */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                            {notes.length > 0 ? (
                                notes.map((note) => (
                                    <div
                                        key={note.id}
                                        className="bg-white border border-gray-200 p-5 rounded-xl shadow hover:shadow-lg transition"
                                    >
                                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                                            {note.title}
                                        </h4>

                                        <div className="text-sm text-gray-600 space-y-1 mb-3">
                                            {note.priority && (
                                                <p><span className="font-medium">Prioridad:</span> {note.priority}</p>
                                            )}
                                            {note.status && (
                                                <p><span className="font-medium">Estado:</span> {note.status}</p>
                                            )}
                                            {note.due_date && (
                                                <p><span className="font-medium">Fecha límite:</span> {new Date(note.due_date).toLocaleDateString('es-PE', {
                                                    year: 'numeric', month: 'long', day: 'numeric'
                                                })}</p>
                                            )}
                                            {note.tags && note.tags.length > 0 && (
                                                <p>
                                                    <span className="font-medium">Etiquetas:</span>{' '}
                                                    {note.tags.map(tag => tag.name).join(', ')}
                                                </p>
                                            )}
                                        </div>


                                        <div className="flex gap-4 mt-4 text-sm">
                                            <Link
                                                href={route('notes.show', note.id)}
                                                className="text-green-600 hover:text-green-800 font-medium"
                                            >
                                                🔍 Ver
                                            </Link>
                                            <Link
                                                href={route('notes.edit', note.id)}
                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                ✏️ Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(note.id)}
                                                className="text-red-600 hover:text-red-800 font-medium"
                                            >
                                                🗑️ Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">Este contexto no tiene notas asociadas aún.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
