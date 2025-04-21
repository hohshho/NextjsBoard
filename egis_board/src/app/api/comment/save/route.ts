import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 클라이언트로부터 받은 JSON 데이터
    const body = await request.json();
    const { postId, content } = body;
    
    if (!postId || !content.trim()) {
      return NextResponse.json(
        { success: false, message: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }
    
    // FormData 객체 생성 (Spring의 @RequestParam으로 받기 위해)
    const formData = new FormData();
    formData.append("postId", postId.toString());
    formData.append("content", content);
    
    // 외부 API 호출
    const externalResponse = await fetch("http://localhost:8300/submitComment", {
      method: "POST",
      body: formData,
    });
    
    // 외부 API 응답 처리
    const externalData = await externalResponse.json();
    
    // 외부 API 응답을 그대로 클라이언트에 전달
    return NextResponse.json(externalData);
    
  } catch (error) {
    console.error('댓글 처리 오류:', error);
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}