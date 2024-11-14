import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { CategorySchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { user } = await validateRequest()
        if (!user) {
            return NextResponse.json({
                error: 'Unauthorized!'
            }, {
                status: 403
            })
        }
        const id = params.id;
        if (!id) {
            return NextResponse.json({
                error: 'Category id is required'
            }, {
                status: 404
            })
        }
        const payload = await req.json();
        const { categoryName } = CategorySchema.parse(payload);

        const existingCategory = await prisma.category.findUnique({
            where: {
                id
            }
        })
        if (!existingCategory) {
            return NextResponse.json({
                error: 'Category id is not found'
            }, {
                status: 404
            })
        }

        const createdCategory = await prisma.category.update({
            where: {
                id
            },
            data: {
                name: categoryName
            }
        })

        return NextResponse.json(createdCategory)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: 'Internal Server Error'
        }, {
            status: 500
        })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return NextResponse.json({
                error: 'Unauthorized'
            }, {
                status: 403
            })
        }
        const id = params.id;
        if (!id) {
            return NextResponse.json({
                error: 'Category id is required'
            }, {
                status: 404
            })
        }
        const existingCategory = await prisma.category.findUnique({
            where: {
                id
            }
        })
        if (!existingCategory) {
            return NextResponse.json({
                error: 'Category id is not found'
            }, {
                status: 404
            })
        }
        const deletedCategory = await prisma.category.delete({
            where: {
                id
            }
        })
        return NextResponse.json(deletedCategory)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: 'Internal Server Error'
        }, {
            status: 500
        })
    }
}