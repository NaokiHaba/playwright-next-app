import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
})

test('TodoMVCへのリンクをクリックすると遷移できる', async ({page}) => {
    await page.click('a[href="https://todomvc.com/"]');
    await page.waitForURL('https://todomvc.com/');
    expect(page.url()).toBe('https://todomvc.com/');
});

test('Headerにtodosと表示', async ({page}) => {
    const header = await page.$('header h1');
    expect(await header?.innerText()).toBe('todos');
});

test('demo', async ({page}) => {
    await page.locator('.new-todo').fill('sample');
    await page.locator('.new-todo').press('Enter');

    // 値が増えるのを待つ
    await page.waitForSelector('.todo-list li:nth-child(1) label');
    await page.waitForSelector('.todo-count');

    const todo = page.locator('.todo-list li:nth-child(1) label');
    const todoCount = page.locator('.todo-count');
    expect(await todo.innerText()).toBe('sample');
    expect(await todoCount.innerText()).toBe('1 item left');
});