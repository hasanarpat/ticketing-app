'use client';

import TicketForm from './TicketForm';

export default function EmptyStateLanding() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <section className="text-center max-w-xl mb-8">
        <div className="pixel-box inline-flex items-center justify-center w-24 h-24 mb-6">
          <span className="text-retro-green text-4xl">[?]</span>
        </div>
        <h1 className="text-retro-green mb-3">
          HENÜZ BİLET YOK
        </h1>
        <p className="text-retro-muted text-xs mb-2">
          İlk biletinizi oluşturun. Başlık, kategori ve öncelik belirleyebilirsiniz.
        </p>
      </section>

      <section className="w-full max-w-2xl">
        <div className="pixel-box p-6">
          <h2 className="text-retro-cyan text-center mb-6 text-sm">
            YENİ BİLET OLUŞTUR
          </h2>
          <TicketForm ticket={{ _id: 'new' }} fullWidth />
        </div>
      </section>

      <p className="mt-8 text-retro-muted text-[10px]">
        Oluşturduktan sonra biletleriniz burada listelenecek.
      </p>
    </div>
  );
}
