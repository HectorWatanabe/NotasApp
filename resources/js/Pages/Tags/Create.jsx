import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tags.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold text-gray-900">Crear Etiqueta</h2>}
        >
            <Head title="Crear Etiqueta" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6 transition-all">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Ej. Discord, Trabajo, Personal"
                                />
                                {errors.name && (
                                    <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                                <Link
                                    href={route('tags.index')}
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
