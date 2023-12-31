const dictionaries = {
  en: () => import('@locales/en/common.json').then((module) => module.default),
  ko: () => import('@locales/ko/common.json').then((module) => module.default),
};

const getDictionary = async (locale: 'ko' | 'en') => dictionaries[locale]();

function removeUndefinedAndNull(obj: Object) {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (
      obj[key as keyof Object] !== undefined &&
      obj[key as keyof Object] !== null
    ) {
      result[key as any] = obj[key as keyof Object];
    }
  }

  return result;
}

const REQUIRE_ENV = ['NEXT_PUBLIC_API_URL'];

export { getDictionary, removeUndefinedAndNull, REQUIRE_ENV };
