import Ticket from '../../../(models)/Ticket';

import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await Ticket.findByIdAndDelete(id);

    return NextResponse.json({ messsage: 'Ticket deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const body = await req.json();
    const ticketData = body.formData;

    const updateTicketData = await Ticket.findByIdAndUpdate(id, {
      ...ticketData,
    });

    return NextResponse.json({ message: 'Ticket updated' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const ticket = await Ticket.findOne({ _id: id });
    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
