import React from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
    const { tags, flash = {} } = usePage().props;

    const { delete: deleteContext } = useForm();

    const handleDelete = (tagId) => {
        if (confirm('¿Estás seguro de que deseas eliminar este tag?')) {
            deleteContext(route('tags.destroy', tagId));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-900">Etiquetas</h2>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white p-6 shadow-lg rounded-2xl">

                        <Head title="Etiquetas" />

                        {flash.success && (
                            <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 transition-all">
                                ✅ {flash.success}
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Lista de Etiquetas</h3>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    href={route('tags.create')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow transition-all text-center"
                                >
                                    + Crear nueva etiqueta
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tags.map((tag) => (
                                <div
                                    key={tag.id}
                                    className="border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-gray-50"
                                >
                                    <h4 className="text-lg font-bold text-gray-800">
                                        {tag.name}
                                    </h4>

                                    <div className="mt-4 flex space-x-3">
                                        <Link
                                            href={route('tags.edit', tag.id)}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                        >
                                            ✏️ Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(tag.id)}
                                            className="text-red-600 hover:text-red-800 font-medium text-sm"
                                        >
                                            🗑️ Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
