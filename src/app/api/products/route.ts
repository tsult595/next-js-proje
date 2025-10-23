import { NextResponse } from 'next/server';
import { getProducts, addProduct } from '../../productLib/db';
import { Iproduct } from '../../product/productType';

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
     // 1. WHO? — Авторизация
    // 1. ЧТО мы получаем?
    const productData = await request.json() as Omit<Iproduct, '_id'>;
    // 4. ГДЕ сохраняем? (БД)
    const newProduct = await addProduct(productData);
    // 5. ЧТО возвращаем?
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// export async function POST(request: Request) {
//   try {
//     // 1. WHO? — Авторизация
//     const authHeader = request.headers.get('authorization');
//     if (!authHeader?.startsWith('Bearer ')) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }
//     const token = authHeader.split(' ')[1];
//     const { role } = verifyToken(token);
//     if (role !== 'admin') {
//       return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//     }

//     // 2. WHAT? — Данные
//     const productData = await request.json() as Omit<Iproduct, '_id'>;

//     // 3. ВАЛИДАЦИЯ
//     if (!productData.name?.trim()) {
//       return NextResponse.json({ error: 'Name is required' }, { status: 400 });
//     }
//     if (!productData.price || productData.price <= 0) {
//       return NextResponse.json({ error: 'Valid price required' }, { status: 400 });
//     }

//     // 4. Дубликат?
//     const existing = await getProductByName(productData.name);
//     if (existing) {
//       return NextResponse.json({ error: 'Product already exists' }, { status: 409 });
//     }

//     // 5. WHERE? — Сохранение
//     const newProduct = await addProduct(productData);

//     // 6. Ответ
//     return NextResponse.json(
//       { success: true, product: newProduct },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('POST /products:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }


