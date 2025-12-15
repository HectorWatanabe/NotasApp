import React from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
    const { contexts, flash = {} } = usePage().props;

    const { delete: deleteContext } = useForm();

    const handleDelete = (contextId) => {
        if (confirm('¿Estás seguro de que deseas eliminar este contexto?')) {
            deleteContext(route('contexts.destroy', contextId));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-900">Contextos</h2>
            }
        >
            <Head title="Contextos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white p-6 shadow-lg rounded-2xl">

                        {flash.success && (
                            <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 transition-all">
                                ✅ {flash.success}
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Lista de Contextos y Notas</h3>
                                <p className="text-sm text-gray-500">Administra tus contextos y notas asociadas</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    href={route('contexts.create')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow transition-all text-center"
                                >
                                    + Crear nuevo contexto
                                </Link>
                                <Link
                                    href={route('notes.create')}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg shadow transition-all text-center"
                                >
                                    + Nueva Nota
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {contexts.map((context) => (
                                <div
                                    key={context.id}
                                    className="border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-gray-50"
                                >
                                    <h4 className="text-lg font-bold text-gray-800">
                                        {context.name}
                                    </h4>
                                    <p className="text-gray-600 mt-2 text-sm">
                                        {context.description || 'Sin descripción'}
                                    </p>

                                    <div className="mt-4 flex space-x-3">
                                        <Link
                                            href={route('contexts.show', context.id)}
                                            className="text-green-600 hover:text-green-800 font-medium text-sm"
                                        >
                                            🔍 Ver
                                        </Link>
                                        <Link
                                            href={route('contexts.edit', context.id)}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                        >
                                            ✏️ Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(context.id)}
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
