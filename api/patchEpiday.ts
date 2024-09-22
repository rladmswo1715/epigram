import BASE_URL from '@/constant/url';

export const patchEpiday = async (epidayId, epidayData, accessToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/epigrams/${epidayId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(epidayData),
    });
    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.message === 'jwt expired') throw { message: '토큰 유효기간 만료' };
      throw { message: errorData.message || '에피데이 수정 실패', details: errorData.details };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
