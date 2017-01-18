package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

func main() {
	port := ":443"
	router := NewRouter()

	log.Fatal(http.ListenAndServeTLS(port, "server.crt", "server.key", router))
}

var routes = Routes{
	Route{
		"Index",
		"GET",
		"/",
		Index,
	},
	Route{
		"dist",
		"GET",
		"/dist",
		Dist,
	},
}

func Logger(inner http.Handler, name string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		inner.ServeHTTP(w, r)

		log.Printf(
			"%s\t%s\t%s\t%s",
			r.Method,
			r.RequestURI,
			name,
			time.Since(start),
		)
	})
}

func NewRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)
	for _, route := range routes {
		var handler http.Handler

		handler = route.HandlerFunc
		handler = Logger(handler, route.Name)

		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)
	}

	router.PathPrefix("/dist/").Handler(http.StripPrefix("/dist/", http.FileServer(http.Dir("dist"))))

	return router
}

func Index(w http.ResponseWriter, req *http.Request) {
	http.ServeFile(w, req, "index.html")
	return
}

func Dist(w http.ResponseWriter, req *http.Request) {
	w.Write([]byte("hello there!"))
	return
}
