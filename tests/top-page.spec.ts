import { test, expect } from '@playwright/test';

// テストの実行前に毎回実行される
test.beforeEach(async ({page}) => {
    await page.goto('https://delishkitchen.tv/');
});

test('任意のキーワードでレシピを検索できる', async ({page}) => {
    // 検索ボックスに「卵焼き」と入力
    await page.getByPlaceholder('料理名・食材でレシピを検索').click();
    await page.getByPlaceholder('料理名・食材でレシピを検索').fill('卵焼き');
    await page.getByPlaceholder('料理名・食材でレシピを検索').press('Enter');

    // ページ遷移を待機
    await page.waitForURL('https://delishkitchen.tv/search?q=%E5%8D%B5%E7%84%BC%E3%81%8D');

    // 検索結果のタイトルが「卵焼き」であることを確認
    await expect(page.getByRole('article')).toContainText('卵焼きのレシピ・作り方！ 作り方がわからなくてお困りの方必見！「卵3個で作る！甘めの卵焼き」「甘〜い卵焼き」「[幼児食]アレンジ卵焼き」など200品の簡単料理レシピ動画からあなたの作りたい！がきっと見つかります。');
});

