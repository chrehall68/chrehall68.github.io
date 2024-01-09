"use client";
import { Blog, Skill, SkillsUsed } from "@/components/Blog";
import { HeadedContainer } from "@/components/HeadedContainer";
import { GitHub } from "@/components/svgs";
import Link from "next/link";
import { Highlight, themes } from "prism-react-renderer";

export default function Page() {
    let code = `
    /**
    * @file threadable.hpp
    * @author Eliot Hall
    * @brief Easy threading functionality
    * @version 0.1
    * @date 2023-02-14
    *
    * @copyright Copyright (c) 2023
    *
    * @addtogroup threading_id
    * @{
    */
   #ifndef IHSBOOST_THREADABLE_HPP
   #define IHSBOOST_THREADABLE_HPP
   
   #include <thread>
   #include <type_traits>
   #include <tuple>
   
   /**
    * @brief A thread that runs the given function with the given arguments
    *
    */
   class Threadable
   {
   public:
       /**
        * @brief Construct a new Threadable object that does nothing
        *
        */
       Threadable();
   
       /**
        * @brief Construct a new Threadable object to run the given member function
        * on the given instance with the given parameters in a separate thread
        * @details upon creation, a Threadable is considered not done and not started
        *
        * @tparam _MemberFunc the type of the member function to call
        * @tparam _Class the type the instance
        * @tparam _Args the types of the arguments to pass to the thread
        * @tparam std::enable_if<std::is_member_function_pointer<_MemberFunc>::value, bool>::type used to enforce template specialization
        * @param func the member function to call. In most circumstances, this is \`&CLASS_NAME::METHOD_NAME\`
        * where CLASS_NAME is the name of the class and METHOD_NAME is the name of the method
        * @param c a pointer to the instance from which to run the member function.
        * @param args the arguments with which to call the member function. Note that these can be lvalues or rvalues
        */
       template <typename _MemberFunc, typename _Class, typename... _Args,
                 typename std::enable_if<std::is_member_function_pointer<_MemberFunc>::value, bool>::type = true>
       Threadable(_MemberFunc &&func, _Class *c, _Args &&...args) : _started(false),
                                                                    _done(false),
                                                                    _thread(), _func(new MemberFunctionWrapper<typename std::decay<_MemberFunc>::type, typename std::decay<_Class>::type, _Args...>(func, c, args...)){};
   
       /**
        * @brief Construct a new Threadable object to run the given function
        * with the given parameters in a separate thread
        * @details upon creation, a Threadable is considered not done and not started.
        *
        * @tparam _Callable the type of the function to call
        * @tparam _Args the types of the arguments to pass to the thread
        * @param func the function to run
        * @param args the arguments to pass to the function. Note that these can be lvalues or rvalues
        */
       template <typename _Callable, typename... _Args>
       Threadable(_Callable &&func, _Args &&...args) : _started(false), _done(false),
                                                       _thread(), _func(new StaticFunctionWrapper<typename std::decay<_Callable>::type, _Args...>(func, args...)){};
   
       /**
        * @brief Destroy the Threadable object
        * @details blocks execution while waiting for the thread to finish
        *
        */
       ~Threadable();
   
       /**
        * @brief Start the thread
        * @details After calling this, the thread is considered
        * started and not considered done until it has finished
        * executing.
        *
        */
       void start();
   
       /**
        * @brief Wait for the thread to finish.
        * @details This is a blocking function
        *
        */
       void join();
   
       /**
        * @brief Return whether or not the thread has completed
        * @details equivalent to calling done \see done
        *
        * @return true - it has completed
        * @return false - it hasn't completed yet OR it hasn't been started yet
        */
       bool operator()() const;
   
       /**
        * @brief Return whether or not the thread has completed
        *
        * @return true - it has completed
        * @return false - it hasn't completed yet OR it hasn't been started yet
        */
       bool done() const;
   
       /**
        * @brief Return whether or not the thread was started
        * @details Once the thread has finished, it is considered
        * not started again.
        *
        * @return true - it has been started
        * @return false - it hasn't been started OR it has already completed
        */
       bool started() const;
   
       Threadable &operator=(const Threadable &other) = delete;
       /**
        * @brief Equals operator for setting a Threadable equal to
        * a Threadable rvalue
        *
        * @param other the Threadable to set this equal to
        * @return Threadable& this Threadable
        */
       Threadable &operator=(Threadable &&other);
   
   private:
       /**
        * @brief Wrapper function that sets done to true after finishing
        *
        */
       void wrapper();
   
       /**
        * @brief Function wrapper class to allow for runtime polymorphism
        *
        */
       class FunctionWrapper
       {
       public:
           /**
            * @brief Call the function with any associated arguments
            *
            */
           virtual void call() = 0;
           virtual ~FunctionWrapper(){};
   
       protected:
           template <std::size_t... Ts>
           struct index
           {
           };
   
           template <std::size_t N, std::size_t... Ts>
           struct gen_seq : gen_seq<N - 1, N - 1, Ts...>
           {
           };
   
           /**
            * @brief Generate a sequence of indexes given the size of
            * a parameter pack
            *
            * @tparam Ts
            */
           template <std::size_t... Ts>
           struct gen_seq<0, Ts...> : index<Ts...>
           {
           };
       };
   
       /**
        * @brief Function wrapper class for static functions (functions
        * that aren't member functions)
        *
        * @tparam _StaticFunc the type of the static function to call
        * @tparam _Args the types of the arguments that will be passed
        */
       template <typename _StaticFunc, typename... _Args>
       class StaticFunctionWrapper : public FunctionWrapper
       {
       private:
           std::tuple<_Args...> _args; ///< used for storing all the arguments in a tuple
           _StaticFunc _func;          ///< the static function to call
   
           /**
            * @brief Unpack the tuple by getting all the arguments by index
            *
            * @tparam Is all the indexes
            */
           template <std::size_t... Is>
           void func_caller(FunctionWrapper::index<Is...>) { _func(std::get<Is>(_args)...); }
   
       public:
           /**
            * @brief Construct a new Static Function Wrapper object
            *
            * @param func the function to call
            * @param args the arguments to call the function with
            */
           StaticFunctionWrapper(_StaticFunc func, _Args... args) : _args(std::forward<_Args>(args)...), _func(func) {}
           virtual ~StaticFunctionWrapper() = default;
           virtual void call() { func_caller(gen_seq<sizeof...(_Args)>{}); }
       };
   
       /**
        * @brief Function wrapper class for member functions
        *
        * @tparam _MemberFunc the type of the member function to call
        * @tparam _Class the type of the class that will call it
        * @tparam _Args the types of the arguments that will be passed
        */
       template <typename _MemberFunc, typename _Class, typename... _Args>
       class MemberFunctionWrapper : public FunctionWrapper
       {
       private:
           std::tuple<_Args...> _args; ///< used for storing arguments in a tuple
           _Class *_ptr;               ///< pointer to instance that calls the member function
           _MemberFunc _func;          ///< pointer to the member function to call
   
           /**
            * @brief Unpack the tuple by getting all the arguments by index
            *
            * @tparam Is all the indexes
            */
           template <std::size_t... Is>
           void func_caller(FunctionWrapper::index<Is...>) { (_ptr->*_func)(std::get<Is>(_args)...); }
   
       public:
           /**
            * @brief Construct a new Member Function Wrapper object
            *
            * @param func the function to call
            * @param ptr the instance to call the function from
            * @param args the arguments to call the function with
            */
           MemberFunctionWrapper(_MemberFunc func, _Class *ptr, _Args... args) : _args(std::forward<_Args>(args)...), _ptr(ptr), _func(func) {}
           virtual ~MemberFunctionWrapper() = default;
           virtual void call() { func_caller(gen_seq<sizeof...(_Args)>{}); }
       };
   
       bool _started;          ///< whether or not the thread was started
       volatile bool _done;    ///< whether or not the thread is done
       std::thread _thread;    ///< the thread itself
       FunctionWrapper *_func; ///< the function to call
   };
   
   #endif
   /**@}*/`
    return <Blog title="IHSBoost" brief="Create a library for my high school robotics team (IHS) to make software prototyping faster and make robotic control more accurate." dates="January 2023- April 2023" github="https://github.com/ihsrobotics/ihsboost">
        <p className="pb-2">
            This was one of my all-time favorite projects to work on. Not only was the code super fun to write,
            but I had tons of fun learning how to use CI/CD to run common actions for me.
            Here&apos;s some highlights from the project.
        </p>
        <HeadedContainer title="Advanced C++" textSize="text-xl">
            <p className="pb-2">
                One of the best parts of this project was being able to use all the advanced C++ techniques
                that I learned from my classes. Templates, enable_if, threads, you name it - all of these
                proved useful somewhere in my library.
            </p>
            <p className="pb-2">
                Here&apos;s a sample of one of my favorite files:
            </p>
            <Highlight language="cpp" code={code} theme={themes.nightOwl} >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre style={style} className="max-h-screen w-full overflow-scroll scrollbar scrollbar-thin scrollbar-thumb-black dark:scrollbar-thumb-white mb-2">
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line })}>
                                <span>{i + 1}</span>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token })} />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
            <p className="pb-2">
                In addition to cool C++ features, I also had the chance to use the Boost library to make
                Python bindings for my library. That was honestly pretty neat; all my C++ code ran seamlessly
                in Python with all the ease of Python and all the speed of C++.
            </p>
        </HeadedContainer>
        <HeadedContainer title="CI/CD" textSize="text-xl">
            <p className="pb-2">
                Aside from writing the library itself, I also enjoyed this project because it was my chance to
                finally learn how to use GitHub Actions for CI/CD (Continuous Integration / Continuous Deployment).
                CI/CD is basically the process of converting the code that you wrote into
                packages / websites / deliverables that are actually usable for most people.
            </p>
            <div className="pb-2">
                <p >
                    For my project, what that looked like was
                </p>
                <li>Running checks on my code to make sure the code quality was acceptable</li>
                <li>
                    Turning the source header files into documentation and deploying that documentation
                    (check out documentation at <Link href="https://ihsrobotics.github.io/ihsboost/" className="underline">ihsrobotics.github.io/ihsboost/</Link>)
                </li>
                <li>
                    Compiling the library for common architectures and packaging it as a debian file for easy install
                    (I have packages available via <Link href="https://github.com/ihsrobotics/ihsboost/releases" className="underline">GitHub releases!!</Link>)
                </li>
            </div>
            <p className="pb-2">
                It turns out, Doxygen makes building and deploying documentation a breeze. As for building the actual libraries, those
                workflows took a bit more work to set up, but they were all the more gratifying when they actually ran (and saved
                me tons of time that I would&apos;ve spent compiling my library on my personal computer).
            </p>
        </HeadedContainer>

        <SkillsUsed>
            <Skill name="C++" brief="This whole library was a chance for me to utilize my C++ skills, so naturally, everything was in C++. Even the Python Bindings were written in C++." img="/cpp.svg" />
            <Skill name="CMake" brief="CMake is my go-to choice for compiling large C++ projects, and it's what I used for this project too. It made everything from linking to external libraries to setting up a Debian package a breeze." img="/cmake.svg" />
            <Skill name="GitHub Actions (CI/CD)" brief="GitHub Actions was crucial to my CI/CD pipeline since it was the runner. As such, I had to understand how to use .yml files, how to run jobs conditionally, and much more." img={<GitHub className="w-[48px] h-[48px]" />} />
        </SkillsUsed>
    </Blog>
}