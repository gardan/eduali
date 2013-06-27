using System;
using System.Collections.Generic;
using System.Data.Entity;
using Ilc.Data.Contracts;

namespace Ilc.Data.Helpers
{
    /// <summary>
    /// A maker of LMP repositories.
    /// </summary>
    /// <remarks>
    /// An instance of this class conatins repository factory functions for different types.
    /// Each factory functions takes an EF <see cref="DbContext"/> and returns 
    /// a repository bound to that DbContext.
    /// <para>
    /// Designed to be a "Singleton", configured at web application start with
    /// all of the factory functions needed to create any type of repository,
    /// Should be thread-sage to use because it is configured at app start,
    /// before any request for a factory, and should be imutable thereafter.
    /// </para>
    /// </remarks>
    public class RepositoriesFactories
    {
        /// <summary>
        /// Get the dictionary of repository factory functions.
        /// </summary>
        /// <remarks>
        /// A dictionary key is a System.Type, typically a repository type.
        /// A value is a repository factory function
        /// that takes a <see cref="DbContext"/> argument and returns
        /// a repository object. Caller must know how to cast it.
        /// </remarks>
        private readonly IDictionary<Type, Func<DbContext, object>> _repositoryFactories;

        /// <summary>
        /// Return the runtime LMP repository factory functions,
        /// each one is a factory for a repository of a particular type.
        /// </summary>
        /// <remarks>
        /// MOTIFY THIS METHOD TO ADD CUSTOM LMP FACTORY FUNCTIONS
        /// </remarks>
        private IDictionary<Type, Func<DbContext, object>> GetCodeCamperFactories()
        {
            // for know this is empty because there are no custom repos
            return new Dictionary<Type, Func<DbContext, object>>()
                {
                    {typeof(IUserProfileRepository), context => new UserProfileRepository(context)},
                    {typeof(IRolesRepository), context => new RolesRepository(context)}
                };
        }

        /// <summary>
        /// Constructor that initializes with runtime LMP repository factories.
        /// </summary>
        public RepositoriesFactories()
        {
            _repositoryFactories = GetCodeCamperFactories();
        }

        /// <summary>
        /// Contructor that initializes with an arbitrary collection factories
        /// </summary>
        /// <param name="factories">
        /// The repository factory functions for this instance
        /// </param>
        /// <remarks>
        /// This ctor is usefull for testing this class
        /// </remarks>
        public RepositoriesFactories(IDictionary<Type, Func<DbContext, object>> factories)
        {
            _repositoryFactories = factories;
        }

        /// <summary>
        /// Get the repository factory function for the type.
        /// </summary>
        /// <typeparam name="T">
        /// Type serving as the repository lookup key.
        /// </typeparam>
        /// <remarks>
        /// The type parameter, T, is typically the repository type
        /// but could be any type (e.g., an entity type)
        /// </remarks>
        public Func<DbContext, object> GetRepositoryFactory<T>()
        {
            Func<DbContext, object> factory;
            _repositoryFactories.TryGetValue(typeof(T), out factory);
            return factory;
        }

        /// <summary>
        /// Get the factory for <see cref="IRepository{T}"/> where T is an entity type.
        /// </summary>
        /// <typeparam name="T">
        /// The root type of the repository, tipically an entity type.
        /// </typeparam>
        /// <returns>
        /// A factory that creates the <see cref="DbContext"/> given an EF <see cref="_repositoryFactories"/>.
        /// </returns>
        /// <remarks>
        /// Looks first for a custom factory in <see cref="DefaultEntityRepositoryFactory{T}"/>.
        /// If not, falls back to the <see cref="_repositoryFactories"/>.
        /// You can substitue an alternative factory for the default one by adding
        /// a repository factory for type "T" to <see cref="IRepository{T}"/>
        /// </remarks>
        public Func<DbContext, object> GetRepositoryFactoryForEntityType<T>() where T : class
        {
            return GetRepositoryFactory<T>() ?? DefaultEntityRepositoryFactory<T>();
        }

        /// <summary>
        /// Default factory for a <see cref="IRepository{T}"/> where T is an entity.
        /// </summary>
        /// <typeparam name="T">
        /// Type of the repository's root entity.
        /// </typeparam>
        protected Func<DbContext, object> DefaultEntityRepositoryFactory<T>() where T : class
        {
            return dbContext => new Repository<T>(dbContext);
        }


    }
}
