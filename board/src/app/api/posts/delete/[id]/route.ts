import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // params를 await로 처리
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    console.log("삭제할 게시글 ID:", id);

    // 백엔드 API 호출
    const response = await fetch(`http://localhost:8300/api/delete/${id}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json, text/plain, */*'
      },
    });

    if (!response.ok) {
      console.error("서버 응답 오류:", response.status);
      return NextResponse.json(
        { success: false, message: "게시글 삭제 실패" },
        { status: response.status }
      );
    }

    // 응답 텍스트로 받아서 안전하게 처리
    const responseText = await response.text();
    console.log("서버 응답:", responseText);
    
    // 홈 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  } catch (error) {
    console.error("게시글 삭제 오류:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}