import { NextApiRequest } from "next";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export const GET = (req: NextApiRequest, res: any) => {
    const filePath = path.join(
        process.cwd(),
        "public/assets/csv/training-program-template.csv"
    );
    const fileData = fs.readFileSync(filePath);
    return new NextResponse(fileData);
};