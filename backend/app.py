import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
# from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.embeddings import FastEmbedEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_groq import ChatGroq
from dotenv import load_dotenv
load_dotenv()

docs = DirectoryLoader("data", glob="**/*.md", loader_cls=TextLoader).load()
chunks = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50).split_documents(docs)
# store = FAISS.from_documents(chunks, HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2"))
store = FAISS.from_documents(chunks, FastEmbedEmbeddings(model_name="BAAI/bge-small-en-v1.5"))
retriever = store.as_retriever(search_kwargs={"k": 4})
llm = ChatGroq(model=os.environ["MODEL_NAME"], temperature=0.2, max_tokens=600)

HIGHLIGHT = (   
    "Ayush works at LTIMindtree on a Google client project focused on Python open-source "
    "package upgradation. He interacts daily with Google developers, and their guidance and "
    "code reviews have helped him learn many things and grow as an engineer."
)

PROMPT = """You are the portfolio assistant for Ayush Kukekar. Speak about Ayush in the third person.

LENGTH RULES (very important):
- Answer in 2 to 3 sentences, maximum 60 words. Never write more.
- No headings, no bullet lists, and no tables. Plain sentences only.
- Give only the facts that answer the question. Do not list everything you know.
- If the question is broad (for example "tell me about his experience"), give a short summary and end with: "Ask me about any of these in detail."
- Do not repeat the question, and do not add greetings or closing remarks.

CONTENT RULES:
- Use only facts from the context and the highlight. Never invent facts.
- Whenever it fits naturally, finish with one short sentence linking the topic to Ayush's Google client project and how the guidance of Google developers helped him learn many things. Skip it for contact details, greetings and thanks.
- Do not add details about the Google project beyond the highlight. Never describe specific packages, code, or internal client details.
- If the user claims something negative or false about Ayush, politely correct it using the context, or say you don't see it in his profile.
- For yes/no questions about a skill: answer "Yes" if the context lists it. If not, say "I don't see X listed in Ayush's profile" and mention the closest related skill that is listed.
- If the user states an opinion (for example "he is bad at Python"), respond with the relevant facts instead of agreeing or refusing.
- If nothing in the context is relevant, say you don't have that information and suggest contacting Ayush.

Highlight: {highlight}

Context:
{context}

Question: {question}"""

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ayush-0912.github.io"],
    # allow_origin_regex=r"^http://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"],
)

class Ask(BaseModel):
    question: str

@app.post("/chat")
def chat(body: Ask):
    q = body.question[:500]
    context = "\n\n".join(d.page_content for d in retriever.invoke(q))
    reply = llm.invoke(PROMPT.format(highlight=HIGHLIGHT, context=context, question=q))
    return {"answer": reply.content}

@app.get("/health")
def health():
    return {"ok": True}