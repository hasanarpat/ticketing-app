'use client';

import TicketForm from './TicketForm';

export default function EmptyStateLanding() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <section className="text-center max-w-xl mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-card mb-6 shadow-lg">
          <svg
            className="w-10 h-10 text-blue-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-default mb-3">
          Henüz bilet yok
        </h1>
        <p className="text-default/80 text-lg">
          İlk biletinizi oluşturarak başlayın. Başlık, kategori ve öncelik belirleyebilirsiniz.
        </p>
      </section>

      <section className="w-full max-w-2xl">
        <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 border border-card-hover/50">
          <h2 className="text-xl font-semibold text-default mb-6 text-center">
            Yeni bilet oluştur
          </h2>
          <TicketForm ticket={{ _id: 'new' }} fullWidth />
        </div>
      </section>

      <p className="mt-8 text-sm text-default/60">
        Oluşturduktan sonra biletleriniz burada listelenecek.
      </p>
    </div>
  );
}
