import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { postId, title, content, fileIds = [] } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: "제목과 내용은 필수입니다." },
        { status: 400 }
      );
    }

    // Spring 서버 API 구조에 맞게 요청 본문 구성
    const requestBody = {
      post: {
        title,
        content
      },
      fileIds: fileIds || []
    };

    // Spring 서버로 요청 전송
    const response = await fetch(`http://localhost:8300/editBoard/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { 
          success: false, 
          message: errorData.message || "게시글 작성에 실패했습니다." 
        },
        { status: response.status }
      );
    }

    // 성공 응답 처리
    const responseData = await response.json();
    
    return NextResponse.json({
      success: true,
      message: "게시글이 성공적으로 작성되었습니다.",
      redirectUrl: responseData.redirectUrl || "/"
    });
  } catch (error) {
    console.error("게시글 작성 오류:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : "서버 오류가 발생했습니다." 
      },
      { status: 500 }
    );
  }
}