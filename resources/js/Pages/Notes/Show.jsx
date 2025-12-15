import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show() {
    const { note } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-900">Detalle de Nota</h2>
            }
        >
            <Head title={`Nota: ${note.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-8 rounded-2xl shadow-md space-y-6">

                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-gray-800">
                                {note.title}
                            </h1>
                            <p className="text-gray-600 whitespace-pre-wrap text-base">
                                {note.content}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700">
                            <div>
                                <span className="font-semibold">Prioridad:</span> {note.priority}
                            </div>
                            <div>
                                <span className="font-semibold">Estado:</span> {note.status}
                            </div>
                            <div>
                                <span className="font-semibold">Contexto:</span> {note.context?.name || 'Ninguno'}
                            </div>
                            <div>
                                <span className="font-semibold">Tags:</span>{' '}
                                {note.tags && note.tags.length > 0
                                    ? note.tags.map(tag => tag.name).join(', ')
                                    : 'Sin etiquetas'}
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <Link
                                href={route('contexts.show', note.context.id)}
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow transition-all"
                            >
                                ← Volver a la lista
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
