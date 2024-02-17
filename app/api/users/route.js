import { User } from '../../(models)/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, password } = body;
    const userData = {
      name,
      email,
      password,
    };

    if (!userData?.email || !userData?.password) {
      return new NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();

    if (duplicate) {
      return new NextResponse.json(
        { message: 'Wrong Credentials' },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const user = new User(userData);
    await user.save();

    return new NextResponse({ message: 'User created' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
