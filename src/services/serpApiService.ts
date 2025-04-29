
// This is a mock service for SerpAPI
// In a real application, you would call the actual SerpAPI

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

export interface SerpApiResponse {
  results: SearchResult[];
  isError?: boolean;
}

export const searchGoogle = async (query: string): Promise<SerpApiResponse> => {
  try {
    console.log("Searching Google via SerpAPI:", query);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock search results based on the query
    const results: SearchResult[] = [];
    
    if (query.toLowerCase().includes("python")) {
      results.push(
        {
          title: "Python Programming Language - Official Website",
          link: "https://www.python.org/",
          snippet: "Python is a programming language that lets you work quickly and integrate systems more effectively. Learn about Python, download it for free, access documentation, and find resources for developers."
        },
        {
          title: "Python Tutorial - W3Schools",
          link: "https://www.w3schools.com/python/",
          snippet: "Python is a popular programming language. Python can be used on a server to create web applications. Start learning Python now »"
        },
        {
          title: "Learn Python - Free Interactive Python Tutorial",
          link: "https://www.learnpython.org/",
          snippet: "Learn Python, a powerful programming language used by sites like YouTube and Dropbox. Learn the fundamentals of programming to build web apps and manipulate data. Master Python loops, functions, objects, and classes."
        }
      );
    } else if (query.toLowerCase().includes("javascript")) {
      results.push(
        {
          title: "JavaScript - MDN Web Docs",
          link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
          snippet: "JavaScript (JS) is a lightweight interpreted programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it."
        },
        {
          title: "Learn JavaScript - Codecademy",
          link: "https://www.codecademy.com/learn/introduction-to-javascript",
          snippet: "Learn the JavaScript programming language. Explore JavaScript courses for all skill levels, from beginner to advanced."
        },
        {
          title: "JavaScript Tutorial - W3Schools",
          link: "https://www.w3schools.com/js/",
          snippet: "JavaScript is the world's most popular programming language. JavaScript is the programming language of the Web. JavaScript is easy to learn. This tutorial will teach you JavaScript from basic to advanced."
        }
      );
    } else {
      results.push(
        {
          title: `${query} - Wikipedia`,
          link: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
          snippet: `Comprehensive information about ${query} including history, applications, and related concepts.`
        },
        {
          title: `Understanding ${query}: A Comprehensive Guide`,
          link: `https://example.com/guide-to-${encodeURIComponent(query)}`,
          snippet: `Learn everything you need to know about ${query}. This guide covers fundamental concepts, practical applications, and expert insights.`
        },
        {
          title: `Latest Research on ${query} - Science Direct`,
          link: `https://sciencedirect.com/search?q=${encodeURIComponent(query)}`,
          snippet: `Recent scientific papers and research findings related to ${query}. Updated with the latest academic discoveries and technological advancements.`
        }
      );
    }
    
    return { results };
  } catch (error) {
    console.error("Error searching with SerpAPI:", error);
    return {
      results: [],
      isError: true
    };
  }
};
