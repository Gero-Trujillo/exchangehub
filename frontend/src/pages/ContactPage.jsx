import React from 'react';

function ContactPage() {
  return (
    <div className="max-w-md p-8 bg-neutral-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 m-auto my-20 rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-emerald-600 dark:text-emerald-300">Contáctanos</h1>
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Nombre completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 dark:focus:ring-emerald-300 focus:border-emerald-600 dark:focus:border-emerald-300 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Correo
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 dark:focus:ring-emerald-300 focus:border-emerald-600 dark:focus:border-emerald-300 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Celular
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 dark:focus:ring-emerald-300 focus:border-emerald-600 dark:focus:border-emerald-300 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 dark:focus:ring-emerald-300 focus:border-emerald-600 dark:focus:border-emerald-300 sm:text-sm"
            required
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-emerald-600 dark:bg-emerald-300 text-white dark:text-zinc-900 font-medium rounded-md shadow-sm hover:bg-emerald-700 dark:hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 dark:focus:ring-emerald-300"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactPage;